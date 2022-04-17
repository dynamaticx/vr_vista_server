import { Body, Get, Header, Post, Route, Tags } from "tsoa";
import { UserMaster } from "../database/entity/UserMaster";
import { LoginPojo } from "../pojos/LoginPojo";
import { UserMasterPojo } from "../pojos/UserMasterPojo";
import { getRepository } from "typeorm";
import { randomString } from "../utils/StringUtils";
import bcrypt from "bcrypt";
import { AuthorizedUser } from "../pojos/AuthorizedUser";
@Tags("User Manager")
@Route("/user-manager")
export default class UserManagerApi {
  @Post("/register")
  public async register(@Body() user: UserMasterPojo): Promise<UserMasterPojo> {
    const userMaster = new UserMaster();
    userMaster.id = user.id;
    userMaster.firstName = user.firstName;
    userMaster.lastName = user.lastName;
    userMaster.email = user.email;
    userMaster.mobile = user.mobile;
    userMaster.isActive = user.isActive;
    userMaster.userRole = user.userRole;
    const salt = await bcrypt.genSalt(10);
    userMaster.password = await bcrypt.hash(user.password, salt);
    userMaster.save();
    return user;
  }

  @Post("/login")
  public async login(
    @Body() loginPojo: LoginPojo
    // , @Header("token") token: string
  ): Promise<AuthorizedUser> {
    const user: UserMaster = await getRepository(UserMaster).findOne({
      where: [{ email: loginPojo.email }, { mobile: loginPojo.mobile }],
    });
    if (null == user) {
      return;
    }

    if (null == user) {
      return;
    }
    const validPassword = await bcrypt.compare(
      loginPojo.password,
      user.password
    );

    if (!validPassword) {
      return;
    }
    user.token = undefined;
    console.log(user.token);
    user.token = randomString(50);
    console.log(user.token);

    user.save();
    const userMasterPojo: UserMasterPojo = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      isActive: user.isActive,
      userRole: user.userRole,
      createdDate: user.createdDate,
      lastUpdatedDate: user.lastUpdatedDate,
      password: null,
      token: user.token,
    };
    const authUser: AuthorizedUser = {
      user: userMasterPojo,
      message: "Login Success",
    };
    return authUser;
  }
}
