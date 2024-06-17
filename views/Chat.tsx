"use client";
import React from "react";
import { ZIMKitManager, Common } from "@zegocloud/zimkit-react";
import "@zegocloud/zimkit-react/index.css";

export default function Chat({ user }: { user: any }) {
  const [state, setState] = React.useState({
    appConfig: {
      appID: 293484753,
      serverSecret: "4ff5386fe8f180ecc5059881f0ccca84",
    },
    userInfo: {
      userID: user?.id,
      userName: user?.given_name,
      userAvatarUrl: user?.picture,
    },
  });

  React.useEffect(() => {
    const init = async () => {
      const zimKit = new ZIMKitManager();
      const token = zimKit.generateKitTokenForTest(
        state.appConfig.appID,
        state.appConfig.serverSecret,
        state.userInfo.userID
      );
      await zimKit.init(state.appConfig.appID);
      await zimKit.connectUser(state.userInfo, token);
    };
    init();
  }, [state.appConfig.appID, state.appConfig.serverSecret, state.userInfo]);
  return (
    <div className="w-full">
      <Common></Common>
    </div>
  );
}
