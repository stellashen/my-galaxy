// code reference: https://stackoverflow.com/questions/9713058/send-post-data-using-xmlhttprequest
import { jwt } from "./jwt";

function authenticateInstallation() {
  const installationId = 1;
  const url = `https://api.github.com/app/installations/${installationId}/access_tokens`;
  const http = new XMLHttpRequest();
  http.open("POST", url, true);
  http.setRequestHeader("Authorization", `Bearer ${jwt}`);
  http.setRequestHeader(
    "Accept",
    "application/vnd.github.machine-man-preview+json"
  );
  http.send(null);
}
