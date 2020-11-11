import { Navigation } from "../types/Navigation";
import { NavigationActionTypes } from "../types/actions";

const navigationReducerDefaultState: Navigation = {
    profileImageClicked:false,
    profileLogoutClicked: false,
    profilePreferencesClicked:false,
    profileMouseOver:false
};

const navigationReducer = (state = navigationReducerDefaultState, action: NavigationActionTypes): Navigation => {

    switch (action.type) {
        case "SET_NAVIGATION":
            return action.data

        case "REMOVE_NAVIGATION":
            return state;
            
        default:
            return state

    }

};

export { navigationReducer }