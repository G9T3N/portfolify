{ pkgs, ... }: {
  # Updated to unstable to support Node 24
  channel = "unstable"; 
  packages = [
    pkgs.nodejs_24
    pkgs.opencode       # Adds OpenCode natively into your workspace PATH
  ];

  idx.extensions = [
    "svelte.svelte-vscode"
    "vue.volar"
  ];

  # Fixed the double-nested "previews = { previews = { ... } }" syntax error
  idx.previews = {
    enable = true;
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--host"
          "0.0.0.0"
        ];
        manager = "web";
      };
    };
  };
}
