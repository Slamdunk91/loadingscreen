# Loadingscreen (FiveM servers script)

Loadingscreen is a script that will give you the possibility to load any video you want as a loading screen for your FiveM Server.

## Installation

To install this resource, simply download, drag & drop the folder "loadingscreen" to your resources on your FiveM server/FTP.

Make sure to add : "ensure loadingscreen" in your server.cfg to start the resource.

## Usage

- Choose the video you want to display :

In Index.html line 22 --> put the source of your video (I greatly advise you to choose mp4 format as it is lighter in terms of file weight).

- Add or Remove background static image :

In Index.html line 21 --> You can decide to have a static background image, if you don't need it just remove the following in line 21 : poster="img/poster.png"
The image is located in the "img" folder. If you replace it make sure to keep the same name once your new image is uploaded.

- Modify cursor & buttons :

Access folder "img", from here you can modify the cursor, volume buttons, that will appear during your loading screen. If you decide to replace them by your own images, please make sure to keep the same names (example: you decide to replace the cursor.svg, when you move your new file to the folder, once moved, make sure the name is back to cursor.svg with your new image).

- Modify cursor size :

In style.css go to lines 100 & 101 and choose the pixels size you want.

- Modify default volume :

In file scipt.js go to line 35 and choose the player volume you want by changing ‘videoVolume’ value from 0.0 to 1.0

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
This code has been written by Bubu and Slamdunk.
