// mock client.get (axios instance)

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
      
      const { flatFeaturesRules, loadFeatures } = useFeatureToggle(mockedAxios);
  
      await loadFeatures('wallet');
  
      expect(flatFeaturesRules.value).toEqual(data)
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
      
      const { flatFeaturesRules, loadFeatures } = useFeatureToggle(mockedAxios);
  
      await loadFeatures('wallet');
  
      expect(flatFeaturesRules.value).toEqual({
        'testKey1.feature.checkForSomething': true,
        'testKey2.checkForAnotherThing': true
      })
    });
  })

  describe('isFeatureEnabled', () => {
    it('should return true for an absent key', async () => {
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