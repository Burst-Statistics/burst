import { useEffect, useRef } from 'react';

export function useEffectAfterMount(effect, dependencies) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const cleanup = effect();
    return cleanup;
  }, dependencies);
}
