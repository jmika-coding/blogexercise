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
      port: Number(configFile.get("http_port"))
    },
    client: {
      client: String(configFile.get("client_client"))
    },
    clientParameters: {
      host: String(configFile.get("client_host")),
      port: Number(configFile.get("client_port")),
      user: String(configFile.get("client_user")),
      password: String(configFile.get("client_password")),
      database: String(configFile.get("client_database"))
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
