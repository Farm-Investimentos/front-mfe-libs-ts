import axios from "axios";
import { useFeatureToggle } from "./useFeatureToggle";

const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("axios");

describe('useFeatureToggle composable', () => {
  describe('feature toggle object composition', () => {
    it('should test behavior of simple object', async () => {
      const data = {
        'testKey': true,
        'testKey2': false
      }
  
      mockedAxios.get.mockResolvedValue({ data })
      
      const { flatFeaturesRules, loadFeatures, isFeatureEnabled } = useFeatureToggle(mockedAxios);
  
      await loadFeatures('wallet');
  
      expect(flatFeaturesRules.value).toStrictEqual(data);
      expect(isFeatureEnabled('testKey')).toBe(data.testKey);
      expect(isFeatureEnabled('testKey2')).toBe(data.testKey2);
    });
  
    it('should test behavior of deep object', async () => {
      const data = {
        "testKey1": {
          "feature": {
            "checkForSomething": true
          }
        },
        "testKey2": {
          "checkForAnotherThing": true
        }
      }
  
      mockedAxios.get.mockResolvedValue({ data })
      
      const { flatFeaturesRules, loadFeatures, isFeatureEnabled } = useFeatureToggle(mockedAxios);
  
      await loadFeatures('wallet');
  
      expect(flatFeaturesRules.value).toStrictEqual({
        'testKey1.feature.checkForSomething': true,
        'testKey2.checkForAnotherThing': true
      })
      expect(isFeatureEnabled('testKey1.feature.checkForSomething')).toBe(data.testKey1.feature.checkForSomething);
      expect(isFeatureEnabled('testKey2.checkForAnotherThing')).toBe(data.testKey2.checkForAnotherThing);
    });
  })

  describe('validations', () => {
    it('should return true for no provided key', async () => {
      const data = {
        "testKey1": {
          "feature": {
            "checkForSomething": true
          }
        },
        "testKey2": {
          "checkForAnotherThing": true
        }
      }
  
      mockedAxios.get.mockResolvedValue({ data })
      
      const { loadFeatures, isFeatureEnabled } = useFeatureToggle(mockedAxios);
  
      await loadFeatures('wallet');

      expect(isFeatureEnabled('')).toBeTruthy();
    });

    it('should return false for an invalid key', async () => {
      const data = {
        "testKey1": {
          "feature": {
            "checkForSomething": true
          }
        },
        "testKey2": {
          "checkForAnotherThing": true
        }
      }
  
      mockedAxios.get.mockResolvedValue({ data })
      
      const { loadFeatures, isFeatureEnabled } = useFeatureToggle(mockedAxios);
  
      await loadFeatures('wallet');

      expect(isFeatureEnabled('testKey3.feature.check')).toBeFalsy();
    });
  })
})