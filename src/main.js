import { mount } from 'svelte';
import Page from './page/Page.svelte';
import './base.css';

if (__PREVIEW__) document.documentElement.classList.add('phone-preview');

mount(Page, { target: document.getElementById('app') });
