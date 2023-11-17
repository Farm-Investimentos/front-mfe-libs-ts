import type { AxiosInstance } from "axios";
import type { FeatureRecordList } from "./types";
import { flatObject } from "../../helpers/flatObject";
import { ref } from "vue";

let flatFeaturesRules = ref<ReturnType<typeof flatObject<boolean>>>({});

export function useFeatureToggle (client: AxiosInstance) {
  /**
   * Fetch for feature flags in /features folder, which will be there after build of `front-mfe-orquestrador`
   * or if we build `front-mfe-toogle-features`
   * 
   * @param name - The name of the file from where you want to get features
   */
  async function loadFeatures (name: string) {
    const { data } = await client.get<FeatureRecordList>(`/features/${name}.json`);
    
    flatFeaturesRules.value = flatObject(data);
  }

  /**
   * Check if a feature key is present and active
   * 
   * @param key - Name of the key in a "flat-object" format, e.g: `wallet.notes.hasList`
   */
  function isFeatureEnabled (key: keyof typeof flatFeaturesRules.value) {
    if (!key) {
      return true;
    }
    return flatFeaturesRules.value[key] || false;
  }

  return {
    flatFeaturesRules,
    loadFeatures,
    isFeatureEnabled
  }
}