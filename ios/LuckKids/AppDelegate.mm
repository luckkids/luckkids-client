#import "AppDelegate.h"
#import <Firebase.h>
#import <React/RCTBundleURLProvider.h>
#import <RNKakaoLogins.h>
#import <GoogleSignIn/GoogleSignIn.h>
#import <RNBranch/RNBranch.h>
#import <CodePush/CodePush.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)app
     openURL:(NSURL *)url
     options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
     [RNBranch application:app openURL:url options:options];
 if([RNKakaoLogins isKakaoTalkLoginUrl:url]) {
    return [RNKakaoLogins handleOpenUrl: url];
 }

  if ([GIDSignIn.sharedInstance handleURL:url]) {
    return [GIDSignIn.sharedInstance handleURL:url];
  }

 return NO;
}

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [RNBranch initSessionWithLaunchOptions:launchOptions isReferrable:YES];
  self.moduleName = @"LuckKids";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};

  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  // return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];

  return [CodePush bundleURL];
#endif
}

- (UIView *)createRootViewWithBridge:(RCTBridge *)bridge
                          moduleName:(NSString *)moduleName
                           initProps:(NSDictionary *)initProps {
  UIView *rootView = [super createRootViewWithBridge:bridge
                                          moduleName:moduleName
                                           initProps:initProps];

  return rootView;
}

@end
