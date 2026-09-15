import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class StaffGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean{
    const request = context.switchToHttp().getRequest();
    console.log(request);
    const staffkey = request.headers["staff-key"];
    console.log(staffkey);
    if(staffkey !== "staff-key"){
      throw new ForbiddenException("Only staff can access this resource");
    }
    return true;
  }
}

// $ nest g guard tickets/guards/staff --no-spec --flat