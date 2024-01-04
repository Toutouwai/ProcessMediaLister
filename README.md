# Media Lister

Lists images and files from across the site in a sortable and filterable table. For images you can choose between table, small thumbnails and large thumbnails view modes.

The module retrieves the data using SQL queries so is able to efficiently list media information for all but the largest of sites.

![ml-main](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/25f06cdc-2ea2-4e4f-9a7b-9e371c8ae1c0)

## Controls

**Media type:** Choose between Images and Files.

**View mode:**: When listing images you can choose between small thumbnails, large thumbnails and table view modes. When in one of the thumbnail view modes you can see information about the image in a tooltip by clicking the "i" icon, or edit the page containing the image by clicking the pencil icon.

![ml-16](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/88dc0f12-8cab-42fc-b30f-904e583460bc)

**From pages matching:** This field allows you to add filters to limit the pages that the media will be listed for.

**Add bookmark:** Superusers can add bookmarks for the current settings that will be available from the flyout menu for all users. See the bookmarks section below for more information.

**Column visibility:** Choose the columns that appear in the table and in the information tooltip (when in thumbnails mode).

![ml-9](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/81a73c13-c8b9-48d5-99b6-10e2faea92c0)

**Search**: Quickly filters the results to show only items that have the search text in any column, whether the column is visible or not. 

![ml-11](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/59793e99-bf83-40aa-a2bb-b787e1e1b7ee)

**Custom search builder**: For more advanced searches where you can combine conditions for specific columns with AND/OR logic.

![ml-10](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/da3d0f5a-79a2-4529-baf2-acca079ef9a1)

**Pagination:** You can navigate through the results and set the number of results per page. 

**Reset:** Click the "Reset" button at the top right to return to the default settings for Media Lister (or for the current bookmark if applicable).

## Editing the page that contains the media

For any media result click the link in the "Page" column to open the page that contains the media item in Page Edit. When in thumbnail view mode you can click the pencil icon to achieve the same thing. The field that contains the media item will be focused.

When a media item is contained within a Repeater field this is indicated by an asterisk at the start of the page title. When opening Page Edit for a media item within a Repeater field the Repeater item will be automatically expanded, including for nested Repeaters.

## Limitations for values that are merged in the database

The module has limited support for multi-language values and custom fields for images/files. In order to be efficient enough to handle large sets of results the module retrieves raw values from the database, and in the case of multi-language values and custom field values ProcessWire stores these in JSON format in a single database column.

![ml-raw-db](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/caa3b56e-cc05-4ef5-bc80-e6f27c4fba5c)

The module improves the display of this JSON data by extracting the uploadName value into a separate column, substituting custom field labels for field IDs, adding language names where possible, and by transforming the data into a quasi-YAML format for better readability. Some limitation remain though – for example, if you use Page Reference fields in the custom fields then only the page IDs are displayed. 

![ml-formatted](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/45d65596-dec6-43a2-943c-2c75fe1917fe)

## Bookmarks

Superusers are able to create a bookmark for the current Media Lister settings by expanding the "Add bookmark" field, entering a title for the bookmark, and clicking the "Add bookmark" button.

![ml-2](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/c61f2ccc-2e35-4f92-9eec-0d8d0535b97d)

Bookmarks will be visible to all users from the flyout menu.

![ml-5](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/142393b4-d2b8-485e-827c-ac01606567fd)

You can delete a bookmark from the module config screen.

![ml-3](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/f8a2c8be-17a7-499b-91cf-8076ba8c35db)

## Module config

In the module config screen you can define defaults for controls such as media type, view mode, pagination limit and column visibility. You can also delete bookmarks from the module config screen.

![ml-4](https://github.com/Toutouwai/ProcessMediaLister/assets/1538852/83eff4ba-20ee-4956-bfe4-b294f33791ce)
