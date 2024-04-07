import { inject } from "@angular/core";
import { CanActivateFn } from "@angular/router";
import { GeneralService } from "../services/general.service";

export const adminGuard: CanActivateFn = (route, state) => {
    const authService = inject(GeneralService);
    if(authService.getUser().username == 'admin'){
        return true
    }
    else return false
    
};