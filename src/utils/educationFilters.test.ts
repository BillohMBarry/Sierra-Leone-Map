import test from 'node:test';
import assert from 'node:assert/strict';
import {
  EDUCATION_STUDY_ITEMS,
  getEducationItemById,
} from '../data/educationData';
import { MAJOR_RIVERS_GEOJSON } from '../data/sierraLeoneGeoJson';
import { filterEducationItems } from './educationFilters';

test('prototype study data includes the five topics and seven candidate rivers', () => {
  assert.deepEqual(
    filterEducationItems(EDUCATION_STUDY_ITEMS, 'rivers', '').map((item) => item.riverName),
    MAJOR_RIVERS_GEOJSON.map((river) => river.name)
  );
  assert.equal(MAJOR_RIVERS_GEOJSON.length, 7);
  assert.equal(getEducationItemById('river-mano')?.status, 'Candidate river; approximate prototype geometry');
});

test('study search matches item names, notes, districts, and regions within selected topic', () => {
  assert.equal(filterEducationItems(EDUCATION_STUDY_ITEMS, 'rivers', 'rivers').length, 7);
  assert.equal(filterEducationItems(EDUCATION_STUDY_ITEMS, 'minerals', 'Kono')[0]?.id, 'mineral-diamonds');
  assert.equal(filterEducationItems(EDUCATION_STUDY_ITEMS, 'rivers', 'Taia')[0]?.id, 'river-jong');
  assert.equal(filterEducationItems(EDUCATION_STUDY_ITEMS, 'chiefdoms', 'Kenema')[0]?.id, 'chiefdom-nongowa');
  assert.equal(filterEducationItems(EDUCATION_STUDY_ITEMS, 'chiefdoms', 'eastern').length, 2);
  assert.equal(filterEducationItems(EDUCATION_STUDY_ITEMS, 'landmarks', 'Kenema').length, 0);
});

test('prototype entries include source and status metadata', () => {
  for (const item of EDUCATION_STUDY_ITEMS) {
    assert.ok(item.status, `${item.id} should state prototype status`);
    assert.ok(item.sourceLabel, `${item.id} should have a source label`);
    assert.ok(item.sourceUrl.startsWith('https://'), `${item.id} should have a source URL`);
  }
});

test('river study entries identify the regions highlighted by their prototype paths', () => {
  assert.deepEqual(
    getEducationItemById('river-rokel')?.relatedRegionIds,
    ['northern', 'north-west']
  );
  for (const item of filterEducationItems(EDUCATION_STUDY_ITEMS, 'rivers', '')) {
    assert.ok(item.relatedRegionIds?.length, `${item.name} should identify a region to highlight`);
  }
});
