import { client2 } from "../provider/client";

export const login = (body) => client2.post('login/authenticate', body)