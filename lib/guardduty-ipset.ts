import { Stack, StackProps } from 'aws-cdk-lib';
import { CfnIPSet } from 'aws-cdk-lib/aws-guardduty';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';
import path = require('path');

export interface GuardDutyIpSetStackProps extends StackProps {}

export class GuardDutyIpSetStack extends Stack {
  constructor(scope: Construct, id: string, props?: GuardDutyIpSetStackProps) {
    super(scope, id, props);

    const detectorId = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'

    const whiteListIpBucket = new Bucket(this, 'WhitelistIpBucket', {});
    const deployment = new BucketDeployment(this, 'WhitelistIp', {
      sources: [Source.asset(path.join(__dirname, './config/guardduty'))],
      destinationBucket: whiteListIpBucket
    });

    const ipSet = new CfnIPSet(this, 'IpSet', {
      activate: true,
      detectorId: detectorId,
      format: 'TXT',
      location: `s3://${whiteListIpBucket.bucketName}/whitelistip.txt`,
    });

    ipSet.node.addDependency(deployment);
  }
}
