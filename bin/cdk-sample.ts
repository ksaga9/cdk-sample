#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { GuardDutyIpSetStack } from '../lib/guardduty-ipset';

const app = new App();

new GuardDutyIpSetStack(app, 'GuardDutyIpSetStack', {
  env: { region: 'ap-northeast-1' },
});
