import useMainContext from "./useMainContext";

export default function useConfig() {
  const { value, set } = useMainContext();

  const setConfig = (newConfig: any) => {
    set((prev) => ({ ...prev, config: newConfig }));
  };

  return { configValue: value.config, setConfig };
}
