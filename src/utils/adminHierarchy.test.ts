import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { test } from 'node:test';
import { parseLocalAreas, normalizeAdministrativeName } from '../data/localAreas';

test('parses the HDX ADM3 local areas and preserves their administrative hierarchy', async () => {
  const geoJson = JSON.parse(
    await readFile(
      new URL('../data/sle_admin_boundaries.geojson/sle_admin3.geojson', import.meta.url),
      'utf8'
    )
  ) as unknown;
  const localAreas = parseLocalAreas(geoJson);
  const northernAreas = localAreas.filter((area) => area.provinceName === 'Northern');

  assert.equal(localAreas.length, 167);
  assert.equal(northernAreas.length, 31);
  assert.deepEqual(
    northernAreas.reduce<Record<string, number>>((counts, area) => {
      counts[area.districtName] = (counts[area.districtName] ?? 0) + 1;
      return counts;
    }, {}),
    { Bombali: 9, Koinadugu: 6, Tonkolili: 11, Fabala: 5 }
  );
  assert.ok(localAreas.every((area) => area.id && area.rings.length > 0));
});

test('normalizes the HDX Fabala spelling to the app district Falaba', () => {
  assert.equal(normalizeAdministrativeName('Fabala'), normalizeAdministrativeName('Falaba'));
  assert.equal(
    normalizeAdministrativeName('North Western'),
    normalizeAdministrativeName('North West')
  );
});
