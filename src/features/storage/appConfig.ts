type AppConfig = {
  markdownConversionEnabled: boolean;
};

type ConfigKeys = "markdownConversionEnabled";

async function getStorageAppConfig(key: ConfigKeys) {
  const stored = await chrome.storage.local.get(key);
  return stored[key];
}

async function setStorageAppConfig(items: Partial<AppConfig>) {
  await chrome.storage.local.set(items);
}

export async function getStoredMarkdownConversionEnabled(): Promise<boolean> {
  const markdownConversionEnabled = await getStorageAppConfig("markdownConversionEnabled");
  return markdownConversionEnabled ?? false;
}

export async function setStoredMarkdownConversionEnabled(enabled: boolean): Promise<void> {
  setStorageAppConfig({ markdownConversionEnabled: enabled });
}
