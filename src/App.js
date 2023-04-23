import { useEffect, useState } from "react";
import Router from "./components/Router";
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(
    window.matchMedia("(display-mode: standalone)").matches
  );

  const handleAddToHomeScreenClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User added to home screen");
        } else {
          console.log("User dismissed the add to home screen prompt");
        }
        setDeferredPrompt(null);
      });
    }
  };

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      console.log("beforeinstallprompt event fired");
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  useEffect(() => {
    const handleStandaloneChange = (e) => setIsStandalone(e.matches);

    const matchMedia = window.matchMedia("(display-mode: standalone)");

    matchMedia.addEventListener("change", handleStandaloneChange);

    return () => {
      matchMedia.removeEventListener("change", handleStandaloneChange);
    };
  }, []);

  useEffect(() => {
    if (isStandalone && deferredPrompt) {
      console.log("App is running in standalone mode");
      setDeferredPrompt(null);
    }
  }, [isStandalone]);

  return (
    <div>
      {!isStandalone && deferredPrompt && (
        <button onClick={handleAddToHomeScreenClick}>Add to Home Screen</button>
      )}
      <Router />
    </div>
  );
}

export default App;
