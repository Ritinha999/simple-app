# Build for iOS

To build your app for iOS, you need to follow these steps:

1. First, you need to have some prerequisites installed on your local machine. You will need a Mac with [Apple Xcode](https://developer.apple.com/xcode/) developer tools installed. We recommend installing the latest version, but you should also check the [Meteor history](https://docs.meteor.com/changelog) for any specific version dependencies. To build with Xcode 10.2+, your webapp package must be v1.7.4 or higher. After installing Xcode, you need to enable Xcode command line tools by running the following command in the terminal:

```bash
sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
```

2. Use the following command to build your app for production:

```bash
meteor build <build-output-directory> --server=<host>:<port>
```

The `<host>` and `<port>` should be the address of the server you want your app to connect to. This will generate a directory at `<build-output-directory>`, which includes a server bundle tarball and the project source for each targeted mobile platform in the `/ios` and `/android` directories.

3. In order to build your app for iOS, you will need to [configure your app](https://guide.meteor.com/cordova#configuring-your-app) with at least a version number, and the required set of app icons and launch screens.

4. After running `meteor build` you can open the generated Xcode project in Xcode:

```bash
cd <build-output-directory>/ios/project
open MyApp.xcodeproj
```

5. From this point on, the process for building the app archive and submitting it to the App Store is the same as it would be for any other iOS app. Please refer to [Apple’s documentation](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html) for further details.

Sources: [1](https://guide.meteor.com/cordova#building-and-submitting), [2](https://guide.meteor.com/cordova#installing-prerequisites-ios)