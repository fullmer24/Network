import { AppState } from "../AppState.js";
import { logger } from "../utils/Logger.js";
import { bcwSandbox } from "./AxiosService.js";





class ContentsService {
    async getContent() {
        const res = await bcwSandbox.get('api/ads')
        logger.log("content data", res.data)
        AppState.content = res.data
    }
}

export const contentsService = new ContentsService()