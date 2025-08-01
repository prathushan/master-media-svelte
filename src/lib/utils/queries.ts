
// /src/lib/utils/queries.ts
import groq from 'groq';

export const menuQuery = groq`*[_type == "menu"][0]`;

// src/lib/utils/queries.ts
export const pageQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  content[]{
    _key,
    _type,
    label,
    block[]{
      _key,
      _type,
      ...,
      backgroundImage{
        ...,
        asset->
      }
    }
  }
}`;
// export const footerQuery = groq`*[_type == "footerSetting"] | order(_updatedAt desc)[0]{
//   footerTitle,
//   footerLogo,
//   footerText,
//   footerMenus[]{
//     menuTitle,
//     links[]{
//       label,
//       "slug": slug.current
//     }
//   },
//   addressSection{
//     addressTitle,
//     address,
//     email,
//     phone
//   },
//   socialLinks[]{
//     platform,
//     url,
//     iconName
//   },
//   copyrightText
// }`;

// export const liveServiceQuery = groq`*[_type == "liveService"][0] {
//   title,
//   startTime,
//   streamUrl,
//   note
// }`;