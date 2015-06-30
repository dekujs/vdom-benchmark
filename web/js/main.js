'use strict';

var benchmark = require('vdom-benchmark-base');
var deku = require('deku');
var createElement = deku.dom;

var NAME = 'Deku';
var VERSION = '0.4.1';

function renderTree(nodes) {
  var children = [];
  var i;
  var e;
  var n;

  for (i = 0; i < nodes.length; i++) {
    n = nodes[i];
    if (n.children !== null) {
      children.push(createElement('div', {key: n.key}, renderTree(n.children)));
    } else {
      children.push(createElement('span', {key: n.key}, n.key.toString()));
    }
  }

  return children;
}

function BenchmarkImpl(container, a, b) {
  this.tree = deku.tree();
  this.container = container;
  this.a = a;
  this.b = b;
}

BenchmarkImpl.prototype.setUp = function() {
};

BenchmarkImpl.prototype.tearDown = function() {
  this.renderer.remove();
  this.tree.unmount();
};

BenchmarkImpl.prototype.render = function() {
  this.renderer = deku.render(this.tree, this.container);
  this.tree.mount(createElement('div', null, renderTree(this.a)));
};

BenchmarkImpl.prototype.update = function() {
  this.tree.mount(createElement('div', null, renderTree(this.b)), this.container);
};

document.addEventListener('DOMContentLoaded', function(e) {
  benchmark(NAME, VERSION, BenchmarkImpl);
}, false);
