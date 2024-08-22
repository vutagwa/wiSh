import { AuthClient } from "@dfinity/auth-client";
import { HttpAgent } from "@dfinity/agent";
import { createActor, wish_backend } from "../../declarations/wish_backend";

const init = async () => {
  const authClient = await AuthClient.create();
  let actor;

  try {
    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    actor = createActor(process.env.CANISTER_ID_WISH_BACKEND, { agent });
  } catch (e) {
    console.error('Failed to create actor', e);
    actor = wish_backend;
  }

  document.getElementById('login').onclick = async (e) => {
    e.preventDefault();
    await new Promise((resolve) => {
      authClient.login({
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app"
            : `http://localhost:4943`, // Use localhost for local development
        onSuccess: resolve,
      });
    });

    const identity = authClient.getIdentity();
    const agent = new HttpAgent({ identity });
    actor = createActor(process.env.CANISTER_ID_WISH_BACKEND, { agent });

    document.getElementById('not_loggedin').style.display = 'none';
    document.getElementById('loggedin').style.display = 'block';
  };

  document.getElementById('whoAmI').onclick = async (e) => {
    e.preventDefault();
    try {
      const principal = await actor.whoami();
      document.getElementById("principal").innerText = "Your principal is: " + principal.toString();
    } catch (e) {
      console.error('Failed to get principal', e);
    }
  };

  if (await authClient.isAuthenticated()) {
    document.getElementById('not_loggedin').style.display = 'none';
    document.getElementById('loggedin').style.display = 'block';
  }

  document.getElementById('logout').onclick = async (e) => {
    e.preventDefault();
    document.getElementById("logout").innerText = "Logging out...";
    document.getElementById("logout").setAttribute("disabled", true);

    await authClient.logout();
    location.reload();
  };
};

init();
