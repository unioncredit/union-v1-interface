declare module "cookie-store" {
  cookieStore: CookieStore;
}

export interface Proposal {
  actions: [
    {
      targets: string[];
      values: string[];
      signatures: string[];
      calldata: [{ type: string; value: string | string[] }];
    }
  ];
  title: string;
  description: string;
}
