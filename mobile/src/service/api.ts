import axios from "axios";
import { apiURL } from "./url";

export const api = axios.create({
  baseURL: apiURL,
});
