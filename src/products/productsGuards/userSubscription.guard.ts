import { CanActivate, ExecutionContext, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class UserSubscription implements CanActivate{
canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request | any = context.switchToHttp().getRequest()
    const userId = request.headers['user-id']
    console.log(userId, 'userId')
    if(!userId) throw new NotFoundException('User not found')
    request.userId = userId
    return true
}

}