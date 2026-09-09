import * as Permissions from "react-native-permissions";
import { Platform } from "react-native";
import { PermissionStatus } from "@/types";

class PermissionsService {
  private getPermissionString(permission: string): Permissions.Permission {
    if (Platform.OS === "ios") {
      const iosPermissions: { [key: string]: Permissions.Permission } = {
        camera: Permissions.PERMISSIONS.IOS.CAMERA,
        microphone: Permissions.PERMISSIONS.IOS.MICROPHONE,
        photo: Permissions.PERMISSIONS.IOS.PHOTO_LIBRARY,
      };
      return iosPermissions[permission] || Permissions.PERMISSIONS.IOS.CAMERA;
    } else {
      const androidPermissions: { [key: string]: Permissions.Permission } = {
        camera: Permissions.PERMISSIONS.ANDROID.CAMERA,
        microphone: Permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,
        photo: Permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      };
      return androidPermissions[permission] || Permissions.PERMISSIONS.ANDROID.CAMERA;
    }
  }

  async checkPermission(permission: string): Promise<PermissionStatus> {
    try {
      const result = await Permissions.check(this.getPermissionString(permission));

      switch (result) {
        case Permissions.RESULTS.GRANTED:
          return "granted";
        case Permissions.RESULTS.DENIED:
          return "denied";
        case Permissions.RESULTS.BLOCKED:
          return "blocked";
        case Permissions.RESULTS.UNAVAILABLE:
          return "undetermined";
        default:
          return "undetermined";
      }
    } catch (error) {
      console.error("Permission check error:", error);
      return "undetermined";
    }
  }

  async requestPermission(permission: string): Promise<PermissionStatus> {
    try {
      const result = await Permissions.request(
        this.getPermissionString(permission)
      );

      switch (result) {
        case Permissions.RESULTS.GRANTED:
          return "granted";
        case Permissions.RESULTS.DENIED:
          return "denied";
        case Permissions.RESULTS.BLOCKED:
          return "blocked";
        case Permissions.RESULTS.UNAVAILABLE:
          return "undetermined";
        default:
          return "undetermined";
      }
    } catch (error) {
      console.error("Permission request error:", error);
      return "denied";
    }
  }

  async requestMultiple(
    permissions: string[]
  ): Promise<{ [key: string]: PermissionStatus }> {
    const results: { [key: string]: PermissionStatus } = {};

    for (const permission of permissions) {
      results[permission] = await this.requestPermission(permission);
    }

    return results;
  }
}

export const permissionsService = new PermissionsService();
