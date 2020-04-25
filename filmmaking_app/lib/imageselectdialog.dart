import 'package:flutter/material.dart';

import 'classes.dart';

typedef ImageSelectCallback = void Function(ImageData, int);

class ImageSelectDialog extends StatelessWidget {
  final ImageSelectCallback onTap;
  final List<ImageData> images;
  final List<AssetImage> imageCache;

  ImageSelectDialog({Key key, @required this.images, @required this.imageCache, @required this.onTap})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    var theme = Theme.of(context);

    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(4),
      ),
      elevation: 0.0,
      backgroundColor: theme.cardColor,
      child: (imageCache != null && imageCache.length > 0)
          ? ListView.builder(
              shrinkWrap: true,
              itemCount: imageCache.length,
              itemBuilder: (BuildContext context, int i) => ListTile(
                contentPadding: const EdgeInsets.symmetric(horizontal: 32),
                leading: CircleAvatar(
                  backgroundImage: imageCache[i],
                  foregroundColor: theme.secondaryHeaderColor,
                ),
                title: Text(
                  images[i].label,
                  style: theme.textTheme.bodyText1,
                ),
                onTap: () {
                  onTap(images[i], i);
                  Navigator.pop(context);
                },
              ),
            )
          : SizedBox(
              height: 200,
              child: Center(
                child: Text('Nothing here', style: theme.textTheme.bodyText2),
              ),
            ),
    );
  }
}
