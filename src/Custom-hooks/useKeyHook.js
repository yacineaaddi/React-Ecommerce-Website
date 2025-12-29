// Import React's useEffect hook
import { useEffect } from "react";

export default function useKey(key, action) {
  useEffect(
    function () {
      // Event listener for keydown events
      function callback(e) {
        // Check if the pressed key matches the target key
        if (e.code.toLowerCase() === key.toLowerCase()) {
          // Call the provided action
          action();
        }
      }

      // Attach keydown listener to the document
      document.addEventListener("keydown", callback);

      // Cleanup: remove listener when component unmounts or deps change
      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    // Re-run effect if the key or action changes
    [action, key]
  );
}
