import * as loaderUtils from "loader-utils";
import { decode } from "./interface";

export default function() {
  return decode(loaderUtils.getOptions(this));
}
