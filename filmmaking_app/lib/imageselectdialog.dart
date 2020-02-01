import 'package:flutter/material.dart';

import 'classes.dart';

typedef ImageSelectCallback = void Function(ImageData, int);

class ImageSelectDialog extends StatelessWidget {
  final ImageSelectCallback onTap;
  final List<ImageData> images;

  ImageSelectDialog({
    this.images,
    @required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    var theme = Theme.of(context);

    return Dialog(
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(4),
      ),
      elevation: 0.0,
      backgroundColor: theme.cardColor,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: <Widget>[
          Padding(
            padding: const EdgeInsets.all(32),
            child: Text(
              'Choose An Image',
              style: theme.textTheme.display3,
            ),
          ),
          if (images != null && images.length > 0) ...[
            ListView.builder(
              shrinkWrap: true,
              itemCount: images.length + 1,
              itemBuilder: (BuildContext context, int i) => i == images.length
                  ? SizedBox(height: 32) // Inline bottom padding
                  : ListTile(
                      contentPadding: const EdgeInsets.symmetric(horizontal: 32),
                      leading: CircleAvatar(
                        backgroundImage: AssetImage(images[i].src),
                        foregroundColor: theme.secondaryHeaderColor,
                      ),
                      title: Text(
                        images[i].label,
                        style: theme.textTheme.body1,
                      ),
                      onTap: () {
                        onTap(images[i], i);
                        Navigator.pop(context);
                      },
                    ),
            ),
          ] else ...[
            SizedBox(
              height: 200,
              child: Center(
                child: Text('Nothing here', style: theme.textTheme.body2),
              ),
            ),
          ]
        ],
      ),
    );
  }
}
