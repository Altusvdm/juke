#!/usr/bin/env node

import { express, renderer, start } from 'universal-redux';
import config from '../../config/universal-redux.config.js';

const app = express(config);

app.use(renderer(config));
start(app, config);
