import { useEffect } from "react";
import {
  META_QUIZ_CONTENT,
  META_STORAGE_KEYS,
  captureMetaSandboxMode,
  trackMetaEventOnce,
} from "../../lib/meta-pixel";

export default function MetaViewContentTracker() {
  useEffect(() => {
    captureMetaSandboxMode();
    trackMetaEventOnce(META_STORAGE_KEYS.viewContent, "ViewContent", {
      ...META_QUIZ_CONTENT,
    });
  }, []);

  return null;
}
