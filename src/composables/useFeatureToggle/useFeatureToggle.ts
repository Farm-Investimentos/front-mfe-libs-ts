import { ref } from "vue";
import flatObject from "../../helpers/flatObject";

import type { AxiosInstance } from "axios";
import type { RecordListToFlatten } from "../../helpers/flatObject/types";

let flatFeaturesRules = ref<RecordListToFlatten<boolean>>({});

export function useFeatureToggle (client: AxiosInstance) {
  /**
   * Fetch for feature flags in /features folder, which will be there after build of `front-mfe-orquestrador`
   * or if we build `front-mfe-toogle-features`
   * 
   * @param name - The name of the file from where you want to get features
   */
  async function loadFeatures (name: string) {
    const { data } = await client.get<RecordListToFlatten<boolean>>(`/features/${name}.json`);
    
    flatFeaturesRules.value = flatObject(data) as RecordListToFlatten<boolean>;
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