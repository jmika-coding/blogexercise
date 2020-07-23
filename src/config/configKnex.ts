import * as fs from 'fs'

export type Config = {
  http: {
    port: number
  };
  client: {
    client: string
  };
  clientParameters: {
    host: string
    port: number
    user: string
    password: string
    database: string
  }
}

export async function loadConfigAsync(file: string): Promise<Config> {
  const configFile: Map<string, string> = await readFileAsync(file);
  return {
    http: {
      port: Number(configFile.get("HTTP_PORT"))
    },
    client: {
      client: String(configFile.get("CLIENT_CLIENT"))
    },
    clientParameters: {
      host: String(configFile.get("CLIENT_HOST")),
      port: Number(configFile.get("CLIENT_PORT")),
      user: String(configFile.get("CLIENT_USER")),
      password: String(configFile.get("CLIENT_PASSWORD")),
      database: String(configFile.get("CLIENT_DATABASE"))
    }
  }
}

async function readFileAsync(file: string) {
  const fileContent = await fs.promises.readFile(file, "utf8");
  let arrayContentConfig: string[] = fileContent.split("\n").filter(el => el != "").join(":").split(":");
  let mapKeyValueConfig: Map<string, string> = new Map();

  let key: string = "";
  for(let i = 0; i <= arrayContentConfig.length; i++){
    if(i % 2 == 0) { key = arrayContentConfig[i]}
    else { mapKeyValueConfig.set(key, arrayContentConfig[i])}
  }

  return mapKeyValueConfig;
}
