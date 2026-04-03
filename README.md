# Photroom-PRX Pinokio

Pinokio launcher for [photoroom-prx-local](https://github.com/PierrunoYT/photoroom-prx-local): a local Gradio UI for Photoroom’s **PRX-1024** text-to-image model (`PRX-1024-t2i-beta`).

## What this launcher does

- **Install**: clones the app into `app/`, creates the Python virtualenv at `app/env`, installs dependencies (including PyTorch via `torch.js` where applicable), and runs the Photoroom PRX stack.
- **Start**: runs `python app.py` from `app/` with `daemon: true`, captures the printed local URL, and exposes **Open Web UI** in the Pinokio sidebar when ready.
- **Update**: `git pull` in the launcher folder and in `app/`.
- **Reset**: removes the `app/` folder so you can reinstall cleanly.

## How to use

1. Install [Pinokio](https://pinokio.computer/).
2. Install this project from URL: `https://github.com/PierrunoYT/Photroom-PRX-Pinokio`
3. Run **Install**, then **Start**. When the server prints an `http://` URL, use **Open Web UI** or the terminal tab.

The Gradio app typically listens on **127.0.0.1**; the exact port is chosen at runtime (see the terminal output).

## Programmatic / API access

The app is a **Gradio** web UI. After **Start**, open the captured URL in a browser.

- **Browser**: use the **Open Web UI** action in Pinokio (same URL as shown in the `start.js` terminal).
- **HTTP**: Gradio exposes REST endpoints under the same origin as the UI (see [Gradio API docs](https://www.gradio.app/guides/getting-started-with-the-python-client)); for custom scripts, prefer the upstream app’s `README` in [photoroom-prx-local](https://github.com/PierrunoYT/photoroom-prx-local).
- **Python**: use the `gradio_client` library against the running server URL if the upstream project documents it.

## Requirements

- Windows, Linux, or macOS (GPU optional; CPU fallbacks exist in `torch.js`)
- Sufficient RAM/VRAM for PRX-1024 inference (see upstream repo)

## Links

- [photoroom-prx-local](https://github.com/PierrunoYT/photoroom-prx-local)
- [Pinokio](https://pinokio.computer/)

## License

See the [photoroom-prx-local](https://github.com/PierrunoYT/photoroom-prx-local) repository for license information.
