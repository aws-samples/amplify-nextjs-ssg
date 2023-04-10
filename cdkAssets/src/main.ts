import { AmplifyExportedBackend } from '@aws-amplify/cdk-exported-backend';
import path from 'path';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    // https://docs.amplify.aws/cli/usage/export-to-cdk/#use-an-exported-amplify-backend-in-aws-cloud-development-kit-cdk
    // @ts-ignore
    const amplifyBackend = new AmplifyExportedBackend(this,
      'amplifyExportedBackend', {
        amplifyEnvironment: 'dev', // Specify your Amplify environment
        path: path.resolve(__dirname, 'amplify-export-amplifynextjsssg'),
      });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'cdkAssets-dev', { env: devEnv });
// new MyStack(app, 'cdkAssets-prod', { env: prodEnv });

app.synth();