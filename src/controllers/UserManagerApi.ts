import { Body, Get, Header, Post, Route, Tags } from "tsoa";
import { UserMaster } from "../database/entity/UserMaster";
import { LoginPojo } from "../pojos/LoginPojo";
import { UserMasterPojo } from "../pojos/UserMasterPojo";
import { getRepository } from "typeorm";
import { randomString } from "../utils/StringUtils";
import bcrypt from "bcrypt";
import { AuthorizedUser } from "../pojos/AuthorizedUser";
import { AddressPojo } from "../pojos/AddressMaster";
import { AddressMaster } from "../database/entity/AddressMaster";

@Tags("User Manager")
@Route("/user-manager")
export default class UserManagerApi {
  @Post("/register")
  public async register(@Body() address: AddressPojo): Promise<AddressPojo> {
    const user = address.userId;

    const userMaster = new UserMaster();
    userMaster.firstName = user.firstName;
    userMaster.lastName = user.lastName;
    userMaster.email = user.email;
    userMaster.mobile = user.mobile;
    userMaster.isActive = user.isActive;
    userMaster.userRole = user.userRole;
    const salt = await bcrypt.genSalt(10);
    userMaster.password = await bcrypt.hash(user.password, salt);
    userMaster.save();

    const addressMaster = new AddressMaster();
    addressMaster.flatNo = address.flatNo;
    addressMaster.lineNoA = address.lineNoA;
    addressMaster.lineNoB = address.lineNoB;
    addressMaster.landmark = address.landmark;
    addressMaster.city = address.city;
    addressMaster.state = address.state;
    addressMaster.country = address.country;
    addressMaster.userId = userMaster;
    addressMaster.save();

    return address;
  }

  @Post("/logout")
  public async logout(@Header("token") token): Promise<String> {
    const user = await getRepository(UserMaster).findOne({
      where: { token: token },
    });

    if (null == user) {
      return "logout success";
    } else {
      user.token = null;
      await user.save();
      return "logout success";
    }
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
    const validPassword = await bcrypt.compare(
      loginPojo.password,
      user.password
    );

    if (!validPassword) {
      return;
    }
    user.token = undefined;
    user.token = randomString(50);

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
