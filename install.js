module.exports = {
  run: [
    {
      method: "shell.run",
      params: {
        message: [
          "git clone https://github.com/PierrunoYT/photoroom-prx-local.git app",
        ]
      }
    },
    // Install the platform-specific torch build first so requirements.txt
    // (torch>=2.6.0) reuses it instead of pulling the default PyPI wheel
    {
      method: "script.start",
      params: {
        uri: "torch.js",
        params: {
          venv: "env",
          path: "app",
        }
      }
    },
    {
      method: "shell.run",
      params: {
        venv: "env",
        path: "app",
        message: [
          "uv pip install --upgrade git+https://github.com/huggingface/diffusers.git",
          "uv pip install --upgrade transformers",
          "uv pip install -r requirements.txt"
        ]
      }
    },
  ]
}
