// const assert = require('assert');
// const hx = require('./').hx;
// const lib = require('./lib');
import * as assert from 'assert';
import { hx } from './';
import * as lib from './lib';

assert.equal(hx([lib.id, 1]), 1)
assert.equal(hx([lib.id, 'hi']), 'hi');
// assert.deepEqual(e([lib.id, [1, 2, 3]]), [1, 2, 3]);
assert.deepEqual(hx([lib.id, { a: 1, b: 2 }]), { a: 1, b: 2 });
assert.deepEqual(hx([lib.id, 
    [lib.id, 1]
]), 1);

/**
 * Math
 */

// add
assert.equal(
    hx([lib.add, 1, 1]),
    2);
assert.equal(
    hx([lib.add, 1, [lib.id, 1]]),
    2
);
assert.equal(
    hx([lib.add, 1, 1, 1, 1, 1, 1]),
    6, "add many");
assert.equal(
    hx([lib.add, [lib.add, 1, 1], 1]),
    3, "add nested 1");
assert.equal(
    hx([lib.add, [lib.add, [lib.add, 1, 1], 1], 1]),
    4, "add nested 2");
assert.equal(
    hx([lib.add, [lib.add, 1, 1], [lib.add, 1, 1]]),
    4, "add multi nested");
assert.equal(
    hx([[lib.add, 1], 1, 1]),
    3, "add curried");

// mul
assert.equal(
    hx([lib.mul, 2, 2]),
    4);
assert.equal(
    hx([lib.mul, 2, 2, 2, 2, 2, 2]),
    64, "mul many");
assert.equal(
    hx([lib.mul, [lib.mul, 2, 2], 2]),
    8, "mul nested 1");
assert.equal(
    hx([lib.mul, [lib.mul, [lib.mul, 2, 2], 2], 2]),
    16, "mul nested 2");
assert.equal(
    hx([lib.mul, [lib.mul, 2, 2], [lib.mul, 2, 2]]),
    16, "mul multi nested");
assert.equal(
    hx([[lib.mul, 2], 2, 2]),
    8, "mul curried");

// div
assert.equal(
    hx([lib.div, 2, 2]),
    1);
// assert.equal(
//     e([lib.div, 2, 2, 2]),
// .5);
// assert.equal(
//     e([lib.div, [lib.div, 2, 2], 2]),
// 8, "nested 1");
// assert.equal(
//     e([lib.div, [lib.div, [lib.div, 2, 2], 2], 2]),
// 16, "nested 2");
// assert.equal(
//     e([lib.div, [lib.div, 2, 2], [lib.div, 2, 2]]),
// 16, "multi nested");
// assert.equal(
//     e([[lib.div, 2], 2, 2]),
// 8, "curried");

// inc
assert.equal(
    hx([lib.inc, 1]),
    2);
assert.equal(
    hx([lib.inc, 1, 1, 1, 1, 1, 1]),
    2, "inc many");
assert.equal(
    hx([lib.inc, [lib.inc, 1]]),
    3, "inc nested 1");
assert.equal(
    hx([lib.inc, [lib.inc, [lib.inc, 1]]]),
    4, "inc nested 2");

// dec
assert.equal(
    hx([lib.dec, 3]),
    2);
assert.equal(
    hx([lib.dec, 3, 3, 3, 3, 3, 3]),
    2, "dec many");
assert.equal(
    hx([lib.dec, [lib.dec, 3]]),
    1, "dec nested 3");
assert.equal(
    hx([lib.dec, [lib.dec, [lib.dec, 3]]]),
    0, "dec nested 2");

// sqr


/**
 * Strings
 */

// str
assert.equal(
    hx([lib.str, 'hello']),
    'hello', "str");
assert.equal(
    hx([lib.str, 'hello', 'world']),
    'helloworld', "str multi");
assert.equal(
    hx([lib.str,
        [lib.str, 'hello'],
        'world'
    ]),
    'helloworld', "str nested 1");
assert.equal(
    hx([lib.str, [lib.str, 'hello', 'world']]),
    'helloworld', "str nested multi");
assert.equal(
    hx([lib.str, [lib.str, 'hello', 'world'], 'omg']),
    'helloworldomg', "str nested with multi");
assert.equal(
    hx([lib.str, 'omg', [lib.str, 'hello', 'world']]),
    'omghelloworld', "str nested with multi again");
assert.equal(
    hx([lib.str,
        [lib.str, 'hel',
            [lib.str, 'lo']
        ],
        'world',
    ]),
    'helloworld', "str nested 2");

// join
assert.equal(
    hx([lib.join, '', ['h', 'e','l','l','o']]), 'hello'
);
assert.equal(
    hx([lib.join, '', [
        [lib.join, ', ', [lib.list, 'hello', 'world']],
        '!'
    ]]), 'hello, world!'
);

// upper

// lower

// print?


/**
 * Higher order functions
 */

// map
assert.deepEqual(
    hx([lib.map, lib.id, [1, 2 , 3]]), [1, 2, 3]
);
assert.deepEqual(
    hx([lib.map, lib.id,
        [lib.id, [1, 2, 3]]
    ]), [1, 2, 3]
);
assert.deepEqual(
    hx([lib.map, lib.id,
        [lib.map, lib.id, [1, 2, 3]]
    ]), [1, 2, 3]
);
assert.deepEqual(
    hx([lib.map, [lib.add, 1],
        [lib.map, [lib.add, 1], [1, 2, 3]]
    ]), [3, 4, 5]
);
assert.deepEqual(
    hx([lib.map, lib.inc, [1, 2, 3]]), [2, 3, 4]
);

// filter
assert.deepEqual(
    hx([lib.filter, lib.id, [1, 2 , 3]]), [1, 2, 3]
);
assert.deepEqual(
    hx([lib.filter, x => x > 2, [1, 2 , 3]]), [3]
);
assert.deepEqual(
    hx([lib.filter, lib.id,
        [lib.id, [1, 2, 3]]
    ]), [1, 2, 3]
);
assert.deepEqual(
    hx([lib.filter, lib.id,
        [lib.filter, lib.id, [1, 2, 3]]
    ]), [1, 2, 3]
);
assert.deepEqual(
    hx([lib.filter, x => x > 1, 
        [lib.filter, x => x < 3,
            [lib.list, 1, 2, 3],
        ],
    ]), [2]
);


console.log('Success!');
