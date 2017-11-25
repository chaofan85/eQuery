import $e from '../lib/main.js';
import { todo } from './todo.js';
import { weatherApp } from './weather.js';


$e(function() {
  todo();
  weatherApp();
});
