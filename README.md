# Photoroom-PRX Pinokio

Pinokio launcher for [photoroom-prx-local](https://github.com/PierrunoYT/photoroom-prx-local): a local Gradio UI for Photoroom's **PRX-1024** text-to-image model (`PRX-1024-t2i-beta`).

## What this launcher does

| Menu item | Script | What it does |
| --- | --- | --- |
| **Install** | `install.js` | Clones the app into `app/`, creates the Python virtualenv at `app/env`, installs `diffusers` (from git), `transformers` and `requirements.txt`, then installs the platform-appropriate PyTorch build via `torch.js`. |
| **Start** | `start.js` | Runs `python app.py` from `app/` as a daemon, captures the local URL the server prints, and exposes **Open Web UI** in the Pinokio sidebar. |
| **Update** | `update.js` | `git pull` in the launcher folder and in `app/`. |
| **Save Disk Space** | `link.js` | Deduplicates redundant library files in `app/env` via `fs.link`. |
| **Reset** | `reset.js` | Removes the `app/` folder so you can reinstall cleanly. |

Installing only prepares the environment — nothing is launched until you run **Start**.

## How to use

1. Install [Pinokio](https://pinokio.computer/).
2. Install this project from URL: `https://github.com/PierrunoYT/Photoroom-PRX-Pinokio`
3. Run **Install**, then **Start**. When the server prints an `http://` URL, use **Open Web UI** or the terminal tab.

The **first Start downloads roughly 5 GB of model weights** from Hugging Face before the UI becomes reachable, so the initial launch takes a while — watch the terminal tab for progress.

`app.py` calls `demo.launch()` without a `server_name`, so the server binds to **127.0.0.1** and is not exposed on the network. The port defaults to **7860**; if that port is busy Gradio picks the next free one, which is why the launcher captures the URL from the terminal output rather than hardcoding it.

## Programmatic / API access

The app is a **Gradio** web UI, so every UI action is also reachable over HTTP at the same origin as the captured URL. Replace `http://127.0.0.1:7860` below with the URL shown in the `start.js` terminal.

`app.py` does not set an explicit `api_name`, so Gradio derives the endpoint name from the handler function — `/generate_image`. Confirm the exact name and argument order for your installed version first:

```python
from gradio_client import Client
Client("http://127.0.0.1:7860").view_api()
```

The generation endpoint takes five arguments, in this order: `prompt` (str), `num_inference_steps` (int), `guidance_scale` (float), `seed` (int), `randomize_seed` (bool). It returns the generated image and a status string.

### Python

```python
from gradio_client import Client

client = Client("http://127.0.0.1:7860")
image_path, status = client.predict(
    "a studio photo of a red ceramic mug on a white background",
    28,      # num_inference_steps
    4.5,     # guidance_scale
    0,       # seed
    True,    # randomize_seed
    api_name="/generate_image",
)
print(status, image_path)  # image_path is a local temp file
```

Install the client with `uv pip install gradio_client` (or `pip install gradio_client`).

### JavaScript

```javascript
import { Client } from "@gradio/client";

const client = await Client.connect("http://127.0.0.1:7860");
const result = await client.predict("/generate_image", [
  "a studio photo of a red ceramic mug on a white background",
  28,     // num_inference_steps
  4.5,    // guidance_scale
  0,      // seed
  true,   // randomize_seed
]);
console.log(result.data);
```

Install the client with `npm install @gradio/client`.

### curl

Gradio's HTTP API is two calls: POST the arguments to get an event id, then GET the result stream.

```bash
EVENT_ID=$(curl -s -X POST http://127.0.0.1:7860/gradio_api/call/generate_image \
  -H "Content-Type: application/json" \
  -d '{"data": ["a studio photo of a red ceramic mug on a white background", 28, 4.5, 0, true]}' \
  | sed -n 's/.*"event_id":"\([^"]*\)".*/\1/p')

curl -N http://127.0.0.1:7860/gradio_api/call/generate_image/$EVENT_ID
```

The stream ends with a `data:` line containing the result — the image entry carries a `url` you can download from the same origin.

## Requirements

- Windows, Linux, or macOS. `torch.js` selects the right PyTorch build per platform/GPU (NVIDIA CUDA, AMD DirectML/ROCm, Apple Silicon, CPU fallback).
- Python 3.8+ (provided by Pinokio's bundled environment).
- ~5 GB of disk for model weights, plus the virtualenv. Sufficient RAM/VRAM for PRX-1024 inference — see the upstream repo.

## Links

- [photoroom-prx-local](https://github.com/PierrunoYT/photoroom-prx-local)
- [Pinokio](https://pinokio.computer/)
- [Gradio client docs](https://www.gradio.app/guides/getting-started-with-the-python-client)

## License

See the [photoroom-prx-local](https://github.com/PierrunoYT/photoroom-prx-local) repository for license information.
