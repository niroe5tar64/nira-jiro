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

export async function getMarkdownConversionEnabled(): Promise<boolean> {
  const markdownConversionEnabled = await getStorageAppConfig("markdownConversionEnabled");
  return markdownConversionEnabled ?? false;
}

export async function setMarkdownConversionEnabled(enabled: boolean): Promise<void> {
  setStorageAppConfig({ markdownConversionEnabled: enabled });
}
