import axios from 'axios';
import { useFeatureToggle } from './useFeatureToggle';

jest.mock('axios');

const featureTestKey = 'featureTestKey';

// Important: this composable share state, that's why we need to clean `flatFeaturesRules.value`
describe('useFeatureToggle composable', () => {
	let mockedAxios = axios as jest.Mocked<typeof axios>;

	describe('feature toggle object composition', () => {
		it('should test behavior of simple object', async () => {
			const data = {
				testKey: true,
				testKey2: false,
			};

			mockedAxios.get.mockResolvedValue({ data });

			const { flatFeaturesRules, loadFeatures, isFeatureEnabled } =
				useFeatureToggle();

			await loadFeatures(mockedAxios, featureTestKey);

			expect(flatFeaturesRules.value).toStrictEqual(data);
			expect(isFeatureEnabled('testKey')).toBe(data.testKey);
			expect(isFeatureEnabled('testKey2')).toBe(data.testKey2);
		});

		it('should test behavior of deep object', async () => {
			const data = {
				testKey1: {
					feature: {
						checkForSomething: true,
					},
				},
				testKey2: {
					checkForAnotherThing: true,
				},
			};

			mockedAxios.get.mockResolvedValue({ data });

			const { flatFeaturesRules, loadFeatures, isFeatureEnabled } =
				useFeatureToggle();

			await loadFeatures(mockedAxios, featureTestKey);

			expect(flatFeaturesRules.value).toStrictEqual({
				'testKey1.feature.checkForSomething': true,
				'testKey2.checkForAnotherThing': true,
			});
			expect(isFeatureEnabled('testKey1.feature.checkForSomething')).toBe(
				data.testKey1.feature.checkForSomething,
			);
			expect(isFeatureEnabled('testKey2.checkForAnotherThing')).toBe(
				data.testKey2.checkForAnotherThing,
			);
		});
	});

	describe('isLoading', () => {
		it('should have loading false at first and after request', async () => {
			const data = {
				testKey: true,
				testKey2: false,
			};

			mockedAxios.get.mockResolvedValue({ data });

			const { isLoading, loadFeatures } = useFeatureToggle();

			expect(isLoading.value).toBe(false);

			await loadFeatures(mockedAxios, featureTestKey);

			expect(isLoading.value).toBe(false);
		});

		it('should have loading false after failed request and not have any rules', async () => {
			const consoleSpy = jest
				.spyOn(console, 'error')
				.mockImplementation(jest.fn);

			mockedAxios.get.mockRejectedValue(new Error('No data'));

			const {
				flatFeaturesRules,
				isLoading,
				loadFeatures,
				isFeatureEnabled,
			} = useFeatureToggle();

			// Reset shared feature flags to test if they will be empty
			flatFeaturesRules.value = {};

			await loadFeatures(mockedAxios, featureTestKey);

			expect(isLoading.value).toBe(false);
			expect(consoleSpy).toHaveBeenCalledTimes(1);
			expect(isFeatureEnabled('testKey')).toBeFalsy();
			expect(flatFeaturesRules.value).toStrictEqual({});
		});
	});

	describe('validations', () => {
		it('should return true for no provided key', async () => {
			const data = {
				testKey1: {
					feature: {
						checkForSomething: true,
					},
				},
				testKey2: {
					checkForAnotherThing: true,
				},
			};

			mockedAxios.get.mockResolvedValue({ data });

			const { loadFeatures, isFeatureEnabled } = useFeatureToggle();

			await loadFeatures(mockedAxios, featureTestKey);

			expect(isFeatureEnabled('')).toBeTruthy();
		});

		it('should return false for an invalid key', async () => {
			const data = {
				testKey1: {
					feature: {
						checkForSomething: true,
					},
				},
				testKey2: {
					checkForAnotherThing: true,
				},
			};

			mockedAxios.get.mockResolvedValue({ data });

			const { loadFeatures, isFeatureEnabled } = useFeatureToggle();

			await loadFeatures(mockedAxios, featureTestKey);

			expect(isFeatureEnabled('testKey3.feature.check')).toBeFalsy();
		});
	});
});
