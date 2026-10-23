import assert from 'node:assert/strict';
import { test } from 'node:test';
import { JSDOM } from 'jsdom';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';

const dom = new JSDOM('<!doctype html><html><body></body></html>');
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.Node = dom.window.Node;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.getComputedStyle = dom.window.getComputedStyle;

test('inserting an image after a selection preserves published text and existing images', () => {
  const editor = new Editor({
    extensions: [StarterKit, Image],
    content: '<h2>Artigo publicado</h2><p>Texto que precisa ser preservado.</p><img src="https://example.com/old.jpg"><p>Final do artigo.</p>',
  });
  try {
    const originalText = editor.getText();
    // Select text across a heading and paragraph, as an author might do before uploading.
    editor.commands.setTextSelection({ from: 3, to: 25 });
    const position = editor.state.selection.to;
    editor.setEditable(false, false);
    editor.chain().insertContentAt(position, {
      type: 'image', attrs: { src: 'https://example.com/new.jpg' },
    }).run();
    editor.setEditable(true, false);
    assert.equal(editor.getText().replace(/\s/g, ''), originalText.replace(/\s/g, ''));
    assert.match(editor.getHTML(), /old\.jpg/);
    assert.match(editor.getHTML(), /new\.jpg/);
    editor.commands.undo();
    assert.equal(editor.getText(), originalText);
    assert.doesNotMatch(editor.getHTML(), /new\.jpg/);
  } finally { editor.destroy(); }
});

test('loading existing HTML does not emit an edit or overwrite the stored value', () => {
  let changes = 0;
  const editor = new Editor({
    extensions: [StarterKit, Image],
    onUpdate: () => { changes++; },
  });
  try {
    editor.commands.setContent('<h2>Publicado</h2><p>Texto <strong>original</strong>.</p><img src="https://example.com/cover.jpg">', { emitUpdate: false });
    assert.equal(changes, 0);
    assert.match(editor.getHTML(), /<strong>original<\/strong>/);
    assert.match(editor.getHTML(), /cover\.jpg/);
    editor.setEditable(false, false);
    editor.setEditable(true, false);
    assert.equal(changes, 0, 'cancelling an image selection must not emit an edit');
  } finally { editor.destroy(); }
});
