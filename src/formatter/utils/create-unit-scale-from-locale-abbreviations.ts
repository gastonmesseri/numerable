import memoize from '../../core/utils/memoize';
import { unitScale } from '../../core/utils/unit-scale';
import stringRepeat from '../../core/utils/string-repeat';

const createUnitScaleFromLocaleAbbreviations = (str: string | undefined) => {
    if (!str) {
        return unitScale({ base: '', scale: {} });
    }

    const scale = str.split('|');
    const scaleDefinition: Record<string, number> = { ['']: 1 };

    scale.forEach((scaleItem, scaleItemIndex) => {
        if (!scaleItem) return;
        scaleDefinition[scaleItem] = +(1 + stringRepeat('0', scaleItemIndex));
    });

    return unitScale({ base: '', scale: scaleDefinition });
};

export default memoize(createUnitScaleFromLocaleAbbreviations);
