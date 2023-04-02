#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { MgbrBlackStack } from '../lib/mgbr_black-stack';


const app = new cdk.App();
new MgbrBlackStack(app, 'MgbrBlackStack');