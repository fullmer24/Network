import { AppState } from "../AppState.js"
import { Profile } from "../models/Profile.js"
import { bcwSandbox } from "./AxiosService.js"


class ProfilesService {
    async getProfileById(id) {
        const res = await bcwSandbox.get(`api/profiles/${id}`)
        AppState.activeProfile = new Profile(res.data)
    }
}


export const profilesService = new ProfilesService()